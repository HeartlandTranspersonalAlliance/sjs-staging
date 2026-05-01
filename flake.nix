{
  description = "Safe Journey Sanctum Astro development and LAN preview environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];

      forAllSystems =
        f:
        nixpkgs.lib.genAttrs systems (
          system:
          f {
            pkgs = import nixpkgs { inherit system; };
            inherit system;
          }
        );
    in
    {
      packages = forAllSystems (
        { pkgs, system }:
        {
          sjs-lan-preview = pkgs.writeShellApplication {
            name = "sjs-lan-preview";
            runtimeInputs = [
              pkgs.bash
              pkgs.coreutils
              pkgs.gawk
              pkgs.gnugrep
              pkgs.gnused
              pkgs.iproute2
              pkgs.nginx
              pkgs.nodejs_24
            ];
            text = ''
              export LAN_PREVIEW_NAME="Safe Journey Sanctum"
              export LAN_PREVIEW_COMMAND="sjs-lan-preview"
              export LAN_PREVIEW_ENV_PREFIX="SJS"
              export LAN_PREVIEW_DEFAULT_PORT="8082"
              export LAN_PREVIEW_BASE_PATH="''${LAN_PREVIEW_BASE_PATH:-/sjs-staging}"
            '' + builtins.readFile ./nix/lan-preview.sh;
          };

          default = self.packages.${system}.sjs-lan-preview;
        }
      );

      apps = forAllSystems (
        { system, ... }:
        {
          sjs-lan-preview = {
            type = "app";
            program = "${self.packages.${system}.sjs-lan-preview}/bin/sjs-lan-preview";
          };

          default = self.apps.${system}.sjs-lan-preview;
        }
      );

      devShells = forAllSystems (
        { pkgs, system }:
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.iproute2
              pkgs.nginx
              pkgs.nodejs_24
              self.packages.${system}.sjs-lan-preview
            ];

            shellHook = ''
              preview_port="''${LAN_PREVIEW_PORT:-''${SJS_PORT:-8082}}"
              preview_auto="''${LAN_PREVIEW_AUTO:-''${SJS_AUTO_PREVIEW:-1}}"

              echo "Safe Journey Sanctum Astro shell"
              echo "  npm run dev          # Astro dev server"
              echo "  npm run build        # Build static dist/"
              echo "  sjs-lan-preview      # Foreground nginx preview"
              echo "  sjs-lan-preview --stop"
              echo

              if [ "$preview_auto" = "1" ]; then
                echo "Safe Journey Sanctum LAN preview auto-start"
                echo "  Serving existing dist/ on port $preview_port"
                SJS_BUILD="''${SJS_AUTO_BUILD:-0}" sjs-lan-preview --daemon || {
                  echo "  Preview did not start. Run npm run build, then sjs-lan-preview --daemon."
                }
              else
                echo "Safe Journey Sanctum LAN preview"
                echo "  Auto-start disabled by SJS_AUTO_PREVIEW=0 or LAN_PREVIEW_AUTO=0"
                echo "  Start:  sjs-lan-preview --daemon"
                echo "  Local:  http://127.0.0.1:$preview_port/sjs-staging/"
              fi
            '';
          };
        }
      );
    };
}
