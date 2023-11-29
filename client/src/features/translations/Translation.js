import React from 'react';
import { useSelector } from 'react-redux';
import { selectTranslationById } from './translationsApiSlice';
import '../../style/Translation.css';

const Translation = ({ translationId, onClick }) => {
    const translation = useSelector(state => selectTranslationById(state, translationId));
    const parseText = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };
    if (translation) {
        return (
            <div className='translation' onClick={() => onClick(translation)}>
                <div className='translation-card'>
                    <div className='translation-info'>
                        <div className='translation-info-item'>
                            <p className='Username'>{translation.username}</p>
                        </div>
                        <div className='translation-info-item'>
                            <p className='LanguageFrom'>{translation.languageFrom}</p>
                        </div>
                        <div className='translation-info-item'>
                            <p className='LanguageTo'>{translation.languageTo}</p>
                        </div>
                        <div className='translation-info-item'>
                            <p className='RequestedText'>{translation.requestedText}</p>
                        </div>
                        <div className='translation-info-item'>
                            <p className='TranslatedText'>{parseText(translation.translatedText)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Translation;

