import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import namesInNative from '../locales/names.json';

import styles from './styles.css';

const getBrowserLocales = () => {
  return navigator.languages || [navigator.userLanguage];
};

const normalize = locale => {
  return locale.replace('-', '_').toLowerCase();
};

const App = ({ localeNames }) => {
  if (navigator.languages) {
    const languages = getBrowserLocales();

    return (
      <div className={styles.container}>
        <h1>
          Your browser <code>Accept-Language</code> languages are:
        </h1>
        <div className={styles.content}>
          <table className={styles.table} width="100%">
            <thead>
              <tr>
                <th>Priority</th>
                <th>ISO Code</th>
                <th>
                  Language name ({`${localeNames[normalize(languages[0])]}`})
                </th>
                <th>Language name in native language</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((locale, id) => {
                const normalizedLocale = normalize(locale);

                return (
                  <tr key={locale}>
                    <td>{id + 1}</td>
                    <td className={styles.localeCode}>{locale}</td>
                    <td className={styles.localeName}>
                      {localeNames[normalizedLocale]}
                    </td>
                    <td className={styles.localeName}>
                      {namesInNative[normalizedLocale]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <footer className={styles.footer}>
          Made with{' '}
          <span className="hearth" aria-label="hearth">
            ❤
          </span>{' '}
          by{' '}
          <a
            href="https://nandez.cat?utm_source=browser-language"
            target="_blank"
            rel="noopener noreferrer"
          >
            nandez.cat
          </a>
          .
        </footer>
      </div>
    );
  }

  return null;
};

App.propTypes = {
  localeNames: PropTypes.object
};

import(`../locales/${normalize(getBrowserLocales()[0])}.json`).then(
  ({ default: locales }) => {
    render(<App localeNames={locales} />, document.getElementById('root'));
  }
);
