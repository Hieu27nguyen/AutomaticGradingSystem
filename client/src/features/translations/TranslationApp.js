import React, { useState, useEffect } from 'react';
import { useGetAllTranslationsQuery, useGetTranslationsByUsernameQuery, useCreateTranslationMutation, useGetAllLanguagesQuery } from './translationsApiSlice';
import TranslationList from './TranslationList';
import useAuth from '../../hooks/useAuth';
import '../../style/Translation.css';

const decodeHtmlEntities = (html) => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

const TranslationApp = () => {
    const { roles, username } = useAuth();
    const { data: supportedLanguages, isLoading: languagesLoading } = useGetAllLanguagesQuery();
    const { data: translationsData, isLoading, isSuccess, isError, error } = useGetAllTranslationsQuery();
    const { data: userTranslationsData } = useGetTranslationsByUsernameQuery(username);
    const [createTranslation, { isLoading: translationLoading }] = useCreateTranslationMutation();

    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [sourceText, setSourceText] = useState('');
    const [translationError, setTranslationError] = useState('');
    const [currentTranslations, setCurrentTranslations] = useState([]);
    const [showTranslationList, setShowTranslationList] = useState(false);

    // Modify the useEffect to set default source and target languages along with selected translation
    useEffect(() => {
        if (supportedLanguages && supportedLanguages.length > 0) {
            setSourceLanguage(supportedLanguages[0].language);
            setTargetLanguage(supportedLanguages[0].language);
        }
    }, [supportedLanguages]);

    // Modify the handleTranslate function to update the selected translation
    const handleTranslate = async () => {
        try {
            const response = await createTranslation({
                username: username,
                text: sourceText,
                source: sourceLanguage,
                target: targetLanguage,
            });

            // Update the selected translation
            setCurrentTranslations([...currentTranslations, response.data.translation]);

            // Set the source text
            setSourceText('');
        } catch (error) {
            setTranslationError('Error translating text. Please try again.');
            console.error('Error translating text:', error);
        }
    };
    const handleDataBoxClick = (translation) => {
        // Update source and target languages when a data box is clicked
        if (translation) {
            setSourceLanguage(translation.languageFrom);
            setTargetLanguage(translation.languageTo);
            setSourceText(translation.requestedText);
            setCurrentTranslations([...currentTranslations, translation.translatedText]);
        }
    };
    const toggleTranslationList = () => {
        setShowTranslationList(!showTranslationList);
    };
    let content;

    if (languagesLoading || isLoading) {
        content = <p>Loading...</p>;
    } else {
        content = (
            <div>
                {/* Translation App */}
                <div className="translation-form">
                    <h2>
                        <span style={{ color: '#4285f4' }}>G</span>
                        <span style={{ color: '#ea4335' }}>o</span>
                        <span style={{ color: '#f4b400' }}>o</span>
                        <span style={{ color: '#4285f4' }}>g</span>
                        <span style={{ color: '#0f9d58' }}>l</span>
                        <span style={{ color: '#ea4335' }}>e</span>
                        Translate
                    </h2>
                    <div className="language-dropdowns">
                        <div>
                            <select
                                value={sourceLanguage}
                                onChange={(e) => setSourceLanguage(e.target.value)}
                                disabled={languagesLoading || translationLoading}
                            >
                                {languagesLoading ? (
                                    <option>Loading...</option>
                                ) : (
                                    supportedLanguages.map((language) => (
                                        <option key={language.language} value={language.language}>
                                            {language.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div>
                            <select
                                value={targetLanguage}
                                onChange={(e) => setTargetLanguage(e.target.value)}
                                disabled={languagesLoading || translationLoading}
                            >
                                {languagesLoading ? (
                                    <option>Loading...</option>
                                ) : (
                                    supportedLanguages.map((language) => (
                                        <option key={language.language} value={language.language}>
                                            {language.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="text-areas">
                        <div>
                            <textarea
                                className='translationDescription-label_1'
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                placeholder="Enter text to translate"
                            />
                        </div>

                        <div>
                            <textarea
                                className='translationDescription-label_2'
                                value={currentTranslations.length > 0 ? decodeHtmlEntities(currentTranslations[currentTranslations.length - 1]) : ''}
                                placeholder='Translation'
                                readOnly
                            />
                        </div>
                    </div>
                    <button className='translation-button' onClick={handleTranslate} disabled={languagesLoading || translationLoading}>
                        {translationLoading ? 'Translating...' : 'Translate'}
                    </button>
                    {translationError && <div className="error-message">{translationError}</div>}
                </div>
                {/* Button to toggle TranslationList visibility */}
                <button className={`toggle-list-button ${showTranslationList ? 'untoggle' : ''}`}
                    onClick={toggleTranslationList}>
                    <i className="bi bi-clock-history"></i>
                </button>
                {/* Render TranslationList component */}
                {showTranslationList &&  (
                    <>
                    {isError ? (
                        <p className="errmsg">Currently {error.data.message.toLowerCase()}</p>
                    ) : (
                        <TranslationList
                            translationsData={roles.includes('JUDGE') ? translationsData : userTranslationsData}
                            handleDataBoxClick={handleDataBoxClick}
                        />
                    )}
                </>
            )}
        </div>
        )
    }
    return content;
};

export default TranslationApp;


