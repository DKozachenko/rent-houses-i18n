locale=$1
output_path=src/locale
out_file=dictionary.$locale.json
output_full_path=$output_path/$out_file

npx ng extract-i18n --output-path=$output_path --format=json --out-file=$out_file

# https://stackoverflow.com/a/525612
# https://github.com/angular/angular/issues/27883
sed -i -e 's/"locale": "en"/"locale": "'"$locale"'"/g' $output_full_path
