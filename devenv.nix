{ pkgs, ... }:

let
  sjsLanPreview = pkgs.writeShellApplication {
    name = "sjs-lan-preview";
    runtimeInputs = [
      pkgs.bash
      pkgs.coreutils
      pkgs.gawk
      pkgs.gnugrep
      pkgs.gnused
      pkgs.nginx
      pkgs.nodejs_24
    ] ++ pkgs.lib.optionals pkgs.stdenv.hostPlatform.isLinux [
      pkgs.iproute2
    ];
    text = ''
      export LAN_PREVIEW_NAME="Safe Journey Sanctum"
      export LAN_PREVIEW_COMMAND="sjs-lan-preview"
      export LAN_PREVIEW_ENV_PREFIX="SJS"
      export LAN_PREVIEW_DEFAULT_PORT="8082"
      export LAN_PREVIEW_BASE_PATH="''${LAN_PREVIEW_BASE_PATH:-/sjs-staging}"
    '' + builtins.readFile ./nix/lan-preview.sh;
  };
in
{
  name = "sjs-staging";

  packages = [
    pkgs.nginx
    pkgs.nodejs_24
    sjsLanPreview
  ] ++ pkgs.lib.optionals pkgs.stdenv.hostPlatform.isLinux [
    pkgs.iproute2
  ];

  scripts = {
    preview.exec = "sjs-lan-preview --daemon";
    preview-foreground.exec = "sjs-lan-preview";
    preview-status.exec = "sjs-lan-preview --status";
    preview-stop.exec = "sjs-lan-preview --stop";
    preview-build.exec = "SJS_BUILD=1 sjs-lan-preview --daemon";
  };

  processes.preview.exec = "sjs-lan-preview";

  enterShell = ''
    preview_port="''${LAN_PREVIEW_PORT:-''${SJS_PORT:-8082}}"
    preview_auto="''${LAN_PREVIEW_AUTO:-''${SJS_AUTO_PREVIEW:-1}}"
    preview_build="''${LAN_PREVIEW_AUTO_BUILD:-''${SJS_AUTO_BUILD:-0}}"
    preview_root="''${LAN_PREVIEW_SITE_ROOT:-''${SJS_SITE_ROOT:-$PWD}}"
    preview_dist="''${LAN_PREVIEW_DIST_DIR:-''${SJS_DIST_DIR:-dist}}"
    case "$preview_dist" in
      /*) preview_index="$preview_dist/index.html" ;;
      *) preview_index="$preview_root/$preview_dist/index.html" ;;
    esac

    echo "Safe Journey Sanctum Astro shell"
    echo "  npm run dev          # Astro dev server"
    echo "  npm run build        # Build static dist/"
    echo "  sjs-lan-preview      # Foreground nginx preview"
    echo "  sjs-lan-preview --stop"
    echo "  preview              # Start daemonized local preview"
    echo "  preview-stop         # Stop daemonized local preview"
    echo "  devenv up            # Run local preview in the foreground"
    echo

    if [ "$preview_auto" = "1" ]; then
      echo "Safe Journey Sanctum LAN preview auto-start"
      echo "  Serving existing dist/ on port $preview_port"
      if [ "$preview_build" = "1" ] || [ -f "$preview_index" ]; then
        SJS_BUILD="$preview_build" sjs-lan-preview --daemon || {
          echo "  Preview did not start. Run npm run build, then sjs-lan-preview --daemon."
        }
      else
        echo "  No $preview_dist/index.html yet. Run npm run build, then sjs-lan-preview --daemon."
        echo "  Or set SJS_AUTO_BUILD=1 to build during shell entry."
      fi
    else
      echo "Safe Journey Sanctum LAN preview"
      echo "  Auto-start disabled by SJS_AUTO_PREVIEW=0 or LAN_PREVIEW_AUTO=0"
      echo "  Start:  sjs-lan-preview --daemon"
      echo "  Local:  http://127.0.0.1:$preview_port/sjs-staging/"
    fi
  '';
}
