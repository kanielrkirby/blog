{
  description = "Nix Flake for `blog.kanielrkirby.com`";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      perSystem = {
        lib,
        pkgs,
        config,
        ...
      }: {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            yarn
          ];
          shellHook = ''
            npm i
          '';
        };
      };
    };
}
