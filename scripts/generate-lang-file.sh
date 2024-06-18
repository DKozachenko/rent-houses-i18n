locale=$1
npx ng extract-i18n --output-path=src/locale --format=json --out-file=dictionary.$locale.json
