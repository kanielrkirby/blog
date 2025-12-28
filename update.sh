PROD=""
if [ "$1" = "--prod" ]; then
    PROD="--prod"
fi
nix develop --command netlify deploy --build "$PROD"
