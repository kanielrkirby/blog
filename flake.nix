{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };
  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux"];
      perSystem = {
        config,
        pkgs,
        lib,
        ...
      }: {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            pnpm
            nodejs_22
            prettierd
            yarn
            nodePackages_latest."@astrojs/language-server"
            nodePackages_latest."@tailwindcss/language-server"
            nodePackages_latest.vscode-langservers-extracted
            nodePackages_latest.tailwindcss
          ];

          shellHook = ''
            npm i
          '';
        };
      };
    };
}
