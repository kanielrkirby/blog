---
# slug:
title: Nix Examples in Real Repositories
desc: In my last blog post, I talked about the fundamentals of building a Nix flake for development environments. While I can certainly see this as being helpful, I personally find that real-world examples are the best way of learning how these workflows *actually work*.
published: 2024-07-22T14:00:00-06:00
# modified:
authors:
  - Kaniel Kirby
tags:
  - NixOS
  - Development Environments
  - Tutorial
featured: true
img: https://raw.githubusercontent.com/NixOS/nixos-artwork/56b7a5788005a3eaecb5298f0dbed0f7d1573abc/wallpapers/nix-wallpaper-nineish-dark-gray.svg
alt: Nineish NixOS Wallpaper from the NixOS/nixos-artwork repo.
# canonicalURL:
# draft: true
---

In my [last blog post](https://dome.software/blog/nix-development-environments/), I talked about the fundamentals of building a Nix flake for development environments. While I can certainly see this as being helpful, I personally find that real-world examples are the best way of learning how these workflows _actually work_.

So today, I'll be going through 3 examples of repositories with complex development environments involving multiple exact versions of packages, and how I might go about setting up a `flake.nix` for each one. Let's get started!

## Requirements

This tutorial only expects that you have [installed Nix](https://nixos.org/download/) and [enabled flake support](https://nixos.wiki/wiki/Flakes).

## VSCode

[VSCode](https://github.com/microsoft/vscode) is a popular [Electron](https://github.com/electron/electron)-based code editor. First, let's go to the [build steps](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites).

> ## Prerequisites
>
> You'll need the following tools:
>
> - [Git](https://git-scm.com/)
> - [Node.JS](https://nodejs.org/en/), **x64**, version `>=20.x`
> - [Yarn 1](https://classic.yarnpkg.com/en/), version `>=1.10.1 and <2`, follow the [installation guide](https://classic.yarnpkg.com/en/docs/install)
> - [Python](https://www.python.org/downloads/) (required for node-gyp; check the [node-gyp readme](https://github.com/nodejs/node-gyp#installation) for the currently supported Python versions)
>   - **Note**: Python will be automatically installed for Windows users through installing `windows-build-tools` npm module (see below)
> - A C/C++ compiler tool chain for your platform:
>   ...
> - **Linux**
>   - On Debian-based Linux: `sudo apt-get install build-essential g++ libx11-dev libxkbfile-dev libsecret-1-dev libkrb5-dev python-is-python3`
>   - On Red Hat-based Linux: `sudo yum groupinstall "Development Tools" && sudo yum install libX11-devel.x86_64 libxkbfile-devel.x86_64 libsecret-devel krb5-devel # or .i686`.
>   - Others:
>     - `make`
>     - [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)
>     - [GCC](https://gcc.gnu.org) or another compile toolchain
>   - Building deb and rpm packages requires `fakeroot` and `rpm`; run: `sudo apt-get install fakeroot rpm`

Here, we see all of the dependencies required for the project to correctly run. Next step is to initialize our flake:

```bash
mkdir vscode-flake
cd vscode-flake
touch flake.nix
```

For the actual flake infrastructure, I like to use [`hercules-ci/flake-parts`](https://github.com/hercules-ci/flake-parts), as it simplifies building for different architectures. The typical template might look something like this:

```nix
{
  description = "Flake for VSCode.";

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
             # ... packages here ...
          ];
        };
      };
    };
}
```

Next, we'll want to go through the dependencies, and find their Nix equivalents. Using `pkg-config` can be a bit finicky on Nix, and Debian/Ubuntu is more popular, so let's go through each one for the Debian system instead:

- `build-essential`: After some research, it appears that [`build-essential` is included by default](https://discourse.nixos.org/t/how-to-set-up-a-nix-shell-with-gnu-build-toolchain-build-essential/38579/2). This makes our lives easier!
- `g++`: Any standard C compiler will do, as long as it provides the `g++` binary. I like to use [MyNixOS](https://mynixos.com/search?q=g%2B%2B) for this, though for this tutorial, I'll stick to the [official NixOS search](https://search.nixos.org/packages?channel=unstable&show=libgcc&from=0&size=50&sort=relevance&type=packages&query=g%2B%2B). This says the standard package is called `libgcc`.
- `libX11-dev`: Many of these packages are [_development_ packages](https://www.linuxintro.org/wiki/Development_package). It's [not the most Google-able thing](https://www.google.com/search?q=dev+package+nixos&oq=dev+package+nixos&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBCDcwNjFqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8), but I eventually found an [actual explanation](https://ryantm.github.io/nixpkgs/stdenv/multiple-output) of the development packages in Nix. This means that we can easily access the `*-dev` variants by selecting `.dev` from the available package, so long as it provides the `dev` output. With a [quick search](https://search.nixos.org/packages?channel=24.05&show=xorg.libX11&from=0&size=50&sort=relevance&type=packages&query=libx11), we can infer that the full package name will be `libX11.dev`.
- `libxkbfile`: [`libxkbfile.dev`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=libxkbfile).
- `libsecret`: [`libsecret.dev`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=libsecret).
- `libkrb5`: [`libkrb5.dev`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=libkrb5).
- `python3-is-python`: This one requires a [bit of research](https://askubuntu.com/questions/1296790/python-is-python3-package-in-ubuntu-20-04-what-is-it-and-what-does-it-actually), but eventually I discovered that `python-is-python3` is a Debian/Ubuntu-specific hack, since they don't allow for `python` to be a symlink to `python3` or `python2`. In other words, we don't need this!
- `git`: While you probably already have it, it's always good practice to be explicit. [`git`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=git).
- `python`: They mention no version, so we can assume 3.11 is close enough! [`python3`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=python3)
- `node`: Any version above or equal to `v20` is good here, so let's go with `v20` exactly. [`nodejs_20`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=node%2020)
- `yarn`: Most projects won't mind if you use `npm`, `pnpm`, `yarn`, `bun`, or something else entirely. This one, however, explicitly requires `yarn`, and **will not build without it**. Default [`yarn`](https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=yarn) is just version 1.

And that's all! Now we just need to add those packages we decided on!

```nix
{
  description = "Flake for VSCode.";

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
            libX11.dev
            libxkbfile.dev
            libsecret.dev
            libkrb5.dev
            libxkbfile.dev
            git
            python3
            nodejs_20
            yarn
          ];
        };
      };
    };
}
```

And with that, the entire development environment should be ready! Let's test it!

```bash
$ nix develop path:.
```

To finalize the changes, we can `git add` and `git commit` the changes, so we can use `nix develop` without specifying the `path:.`.

## Alacritty

[Alacritty](https://github.com/alacritty/alacritty) is a popular terminal emulator written in [Rust](https://www.rust-lang.org). Just like before, we'll go through the [build steps](https://github.com/alacritty/alacritty/blob/master/INSTALL.md), and use our template.

> #### NixOS/Nixpkgs
>
> The following command can be used to get a shell with all development dependencies on NixOS.
>
> ```sh
> nix-shell -A alacritty '<nixpkgs>'
> ```

Whoops! This one's already done! Well, let's go forward anyways, and compare notes!

> ### Dependencies
>
> These are the minimum dependencies required to build Alacritty, please note
> that with some setups additional dependencies might be desired.
>
> If you're running Wayland with an Nvidia GPU, you'll likely want the EGL
> drivers installed too (these are called `libegl1-mesa-dev` on Ubuntu).
>
> #### Debian/Ubuntu
>
> If you'd like to build a local version manually, you need a few extra libraries
> to build Alacritty. Here's an apt command that should install all of them. If
> something is still found to be missing, please open an issue.
>
> ```sh
> apt install cmake pkg-config libfreetype6-dev libfontconfig1-dev libxcb-xfixes0-dev libxkbcommon-dev python3
> ```
>
> ...
>
> ## Building
>
> ### Linux / Windows / BSD
>
> ```sh
> cargo build --release
> ```
>
> On Linux/BSD, if it is desired to build Alacritty without support for either the
> X11 or Wayland rendering backend the following commands can be used.
>
> ```sh
> # Force support for only Wayland
> cargo build --release --no-default-features --features=wayland
>
> # Force support for only X11
> cargo build --release --no-default-features --features=x11
> ```
>
> If all goes well, this should place a binary at `target/release/alacritty`.

This one seems to make use of [`rustc`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=rustc) [`cargo`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=cargo), [`pkg-config`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=pkg-config), [`cmake`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=cmake) [`freetype.dev`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=freetype), [`fontconfig.dev`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=fontconfig), [`xorg.libXfixes.dev`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=libxcb+xfixes), [`libxkbcommon.dev`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=xkbcommon), and [`python3`](https://search.nixos.org/packages?channel=24.05&from=0&size=50&sort=relevance&type=packages&query=python3).

We'll copy the template, and simply [add Rust](https://nixos.wiki/wiki/Rust) to the shell with the other dependencies.

```nix
{
  description = "Flake for Alacritty.";

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
            cargo
            rustc
            pkg-config
            cmake
            freetype.dev
            fontconfig.dev
            xorg.libXfixes.dev
            libxkbcommon.dev
            python3
          ];
        };
      };
    };
}
```

If we'd like to have a bit more control over Rust's build environment though, we should probably use [`fenix`](https://github.com/nix-community/fenix), since the provided toolchain is only pinned to the stable version.

```nix
{
  # ...
  inputs = {
    # ...
    fenix.url = "github.com:nix-community/fenix";
  };
          # ...
          packages = [
            # ...
            fenix.packages.${system}.complete.toolchain
            # OR
            (fenix.packages.${system}.complete.withComponents [
              "rustc"
              "cargo"
              "clippy" # optional
            ])
            # OR
            (fenix.packages.${system}.combine with fenix.packages.${system} [
              minimal.rustc
              minimal.cargo
              latest.rust-analyzer # optional
              targets.wasm32-unknown-unknown.latest.rust-std # just an example, if you need things from different toolchains
            ])
            # ...
          ];
  # ...
}
```

Now let's see what was done [in the source](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/terminal-emulators/alacritty/default.nix)!

Hm... This isn't familiar, what's going on here? Well, the way `nix develop` works is by preferring a `devShell`, but if none is provided, utilizing the build environment of the package. This can be a bit of a hack, but with uniform systems like Rust, it's a bit easier to make work.

Here, we see the `buildInputs` we needed, as well as some extra handling for [MacOS](https://wickedchicken.github.io/post/macos-nix-setup/), [`zsh`](https://linuxhandbook.com/why-zsh/), [`man`](https://en.wikipedia.org/wiki/Man_page), and [`terminfo`](https://man7.org/linux/man-pages/man5/terminfo.5.html). They're also making using of `rustPlatform.buildRustPackage`, which is the built-in way of building `cargo` packages.

That's about it for this one!

## Zathura

[Zathura](https://pwmt.org/projects/zathura) is a Vim-like PDF viewer for Linux and MacOS. As always, [the build steps](https://github.com/pwmt/zathura/blob/develop/README.md).

> ## Requirements
>
> The following dependencies are required:
>
> - `gtk3` (>= 3.24)
> - `glib` (>= 2.72)
> - `girara` (>= 0.4.3)
> - `libmagic` from file(1): for mime-type detection
> - `json-glib`
> - `sqlite3` (>= 3.6.23): sqlite3 database backend
>
> The following dependencies are optional:
>
> - `libsynctex` from TeXLive (>= 1.19): SyncTeX support
> - `libseccomp`: sandbox support
>
> For building zathura, the following dependencies are also required:
>
> - `meson` (>= 0.61)
> - `gettext`
> - `pkgconf`
>
> The following dependencies are optional build-time only dependencies:
>
> - `librvsg-bin`: PNG icons
> - `Sphinx`: manpages and HTML documentation
> - `doxygen`: HTML documentation
> - `breathe`: for HTML documentation
> - `sphinx_rtd_theme`: for HTML documentation
>
> Note that `Sphinx` is needed to build the manpages. If it is not installed, the
> man pages won't be built. For building the HTML documentation, `doxygen`,
> `breathe` and `sphinx_rtd_theme` are needed in addition to `Sphinx`.
>
> The use of `libseccomp` and/or `landlock` to create a sandboxed environment is
> optional and can be disabled by configure the build system with
> `-Dseccomp=disabled` and `-Dlandlock=disabled`. The sandboxed version of zathura
> will be built into a separate binary named `zathura-sandbox`. Strict sandbox
> mode will reduce the available functionality of zathura and provide a read only
> document viewer.

Luckily, another well-defined list of dependencies. Let's walk through them.

- `gtk3`: [`gtk3`](https://search.nixos.org/packages?channel=unstable&type=packages&query=gtk3).
- `glib`: [`glib`](https://search.nixos.org/packages?channel=unstable&type=packages&query=glib).
- `girara`: [`girara`](https://search.nixos.org/packages?channel=unstable&type=packages&query=girara).
- `libmagic`: [`file`](https://search.nixos.org/packages?channel=unstable&type=packages&query=file).
- `json-glib`: [`json-glib`](https://search.nixos.org/packages?channel=unstable&type=packages&query=json-glib).
- `sqlite3`: [`sqlite`](https://search.nixos.org/packages?channel=unstable&type=packages&query=sqlite3).
- `libsynctex`: [`texlivePackages.synctex`](https://search.nixos.org/packages?channel=unstable&type=packages&query=synctex).
- `libseccomp`: [`libseccomp`](https://search.nixos.org/packages?channel=unstable&type=packages&query=libseccomp).
- `meson`: [`meson`](https://search.nixos.org/packages?channel=unstable&type=packages&query=meson).
- `gettext`: [`gettext`](https://search.nixos.org/packages?channel=unstable&type=packages&query=gettext).
- `pkgconf`: [`pkgconf`](https://search.nixos.org/packages?channel=unstable&type=packages&query=pkgconf).
- `librsvg`: [`librsvg`](https://search.nixos.org/packages?channel=unstable&type=packages&query=librsvg).
- `Sphinx`: [`sphinx`](https://search.nixos.org/packages?channel=unstable&type=packages&query=sphinx).
- `doxygen`: [`doxygen`](https://search.nixos.org/packages?channel=unstable&type=packages&query=doxygen).
- `breathe`: [`python312Packages.breathe`](https://search.nixos.org/packages?channel=unstable&type=packages&query=breathe).
- `sphinx_rtd_theme`: [`python312Packages.sphinx-rtd-theme`](https://search.nixos.org/packages?channel=unstable&type=packages&query=sphinx+rtd).

And that's about it! The build steps also mention [`meson`](https://search.nixos.org/packages?channel=unstable&type=packages&query=meson) and [`ninja`](https://search.nixos.org/packages?channel=unstable&type=packages&query=ninja), so we'll add those as well.

```nix
{
  description = "Flake for Zathura.";

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
            gtk3
            glib
            girara
            libmagic
            json-glib
            sqlite3
            libsynctex
            libseccomp
            meson
            gettext
            pkgconf
            librsvg
            Sphinx
            doxygen
            breathe
            sphinx_rtd_theme
            meson
            ninja
          ];
        };
      };
    };
}
```

## One Small Trick..

We hinted at this earlier with [`alacritty`](#alacritty), but if the package already has a Nix package available for it, you _might_ not even have to do any of this! This is because a Nix devShell is simply a shell with all of the dependencies necessary to build to package, and in each package, you _already go through each of the build steps to build it_, since Nix is a [source distribution]().

Another way of saying this is with a real command. I want the build tools for `zsh`, or `firefox`, or `signal-desktop`:

```bash
nix develop nixpkgs#zsh
nix develop nixpkgs#firefox
nix develop nixpkgs#signal-desktop
```

Note that this will likely not work for every package (there's often many patches and complexities that go into a Nix derivation), and it's always best to check the documentation for building, especially if they have an explicit Nix section.

## Conclusion

As you can see, development environments are [typically](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/misc/zathura/core/default.nix) [much](https://github.com/NixOS/nixpkgs/tree/master/pkgs/servers/adguardhome) [simpler](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/terminal-emulators/foot/default.nix) [than](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/terminal-emulators/alacritty/default.nix) [package](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/search/recoll/default.nix) [derivations](https://github.com/NixOS/nixpkgs/blob/master/pkgs/applications/misc/xiphos/default.nix), because you don't need to necessarily (yet) support multiple platforms and edge cases for building. You just need the tools to build! While it's always a good skill to have, development environments are quite a bit more useful for, well, developers!

I hope this article was helpful, happy hacking!
