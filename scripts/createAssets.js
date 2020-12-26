const fs = require("fs");
const path = require("path");
const ora = require("ora");

const cldr = require("cldr");

const outDir = path.join(__dirname, "..", "locales");

const spinner = ora("Processing locales").start();

const persistDisplayName = function (locale, content) {
  return new Promise((resolve, reject) => {
    const filename = path.join(outDir, `${locale}.json`);

    fs.writeFile(
      filename,
      JSON.stringify(content, null, 2),
      "utf-8",
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve(locale);
      }
    );
  });
};

function getLocaleNames(sourceLocale = "en") {
  const names = cldr.extractLanguageDisplayNames(sourceLocale);

  return function (locale) {
    if (!names[locale]) {
      return locale;
    }

    return names[locale];
  };
}

async function extractLanguageName(locales) {
  const names = {};

  for (const locale of locales) {
    const languageNames = cldr.extractLanguageDisplayNames(locale);
    names[locale] = languageNames[locale];
  }

  await persistDisplayName("names", names);
  spinner.succeed(`Successfully wrote language name files.`);
}

async function extractDisplayNames(locales) {
  const localeNames = getLocaleNames();

  for (const locale of locales) {
    spinner.text = `Processing ${localeNames(locale)}`;
    spinner.color = "yellow";

    await persistDisplayName(locale, cldr.extractLanguageDisplayNames(locale));
  }

  spinner.succeed(`Successfully wrote ${locales.length} locales`);
}

async function createAssets() {
  const locales = cldr.localeIds;

  await extractDisplayNames(locales);
  await extractLanguageName(locales);
}

createAssets();
