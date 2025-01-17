import Link from 'next/link';
import React from 'react';

const flags: Record<string, string> = {
  en: 'https://flagcdn.com/us.svg',
  es: 'https://flagcdn.com/es.svg',
  fr: 'https://flagcdn.com/fr.svg',
  de: 'https://flagcdn.com/de.svg',
  it: 'https://flagcdn.com/it.svg',
  pt: 'https://flagcdn.com/pt.svg',
  ru: 'https://flagcdn.com/ru.svg',
  zh: 'https://flagcdn.com/cn.svg',
  ja: 'https://flagcdn.com/jp.svg',
  ko: 'https://flagcdn.com/kr.svg',
  ar: 'https://flagcdn.com/sa.svg',
  tr: 'https://flagcdn.com/tr.svg',
  nl: 'https://flagcdn.com/nl.svg',
  pl: 'https://flagcdn.com/pl.svg',
  id: 'https://flagcdn.com/id.svg',
  hi: 'https://flagcdn.com/in.svg',
};

const fallbackFlag = 'https://flagcdn.com/un.svg';

type Language = {
  lang: string;
};

type LanguageSelectorProps = {
  currentLanguage: string;
  languages: Language[];
  theme: "DARK" | "LIGHT";
  blogPath: string;
};

// Notice: no "use client" at the top
const LanguageSelector = async ({
  currentLanguage,
  languages,
  theme,
  blogPath
}: LanguageSelectorProps) => {
  const currentLangObject = languages.find(
    (lang) => lang.lang === currentLanguage
  );
  const currentFlag = currentLangObject
    ? flags[currentLangObject.lang] ?? fallbackFlag
    : fallbackFlag;

  const isDarkMode = theme === "DARK";

  const containerStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
  };

  const summaryStyle: React.CSSProperties = {
    listStyle: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
    borderRadius: '4px',
    padding: '8px 12px',
    margin: 0,
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    backgroundColor: isDarkMode ? '#444' : '#fff',
    border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
    borderRadius: '4px',
    marginTop: '4px',
    zIndex: 999,
    minWidth: '160px',
    color: isDarkMode ? '#fff' : '#000',
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${isDarkMode ? '#555' : '#eee'}`,
    textDecoration: 'none',
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <details style={containerStyle}>
      <summary style={summaryStyle}>
        <img
          src={currentFlag}
          alt={currentLanguage}
          style={{
            width: '20px',
            height: '20px',
            marginRight: '8px',
            objectFit: 'contain',
          }}
        />
        <span>{currentLangObject?.lang ?? 'Select Language'}</span>
      </summary>

      <div style={dropdownStyle}>
        {languages.map((lang) => {
          const flagSrc = flags[lang.lang] ?? fallbackFlag;
          return (
            <Link
              key={lang.lang}
              href={`${blogPath}/${lang.lang}`}
              style={dropdownItemStyle}
            >
              <img
                src={flagSrc}
                alt={lang.lang}
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '8px',
                  objectFit: 'contain',
                }}
              />
              <span>{lang.lang}</span>
            </Link>
          );
        })}
      </div>
    </details>
  );
};

export default LanguageSelector;
