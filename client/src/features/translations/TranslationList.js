import React, { useEffect } from 'react';
import Translation from './Translation';
import '../../style/Translation.css';

const TranslationList = ({ translationsData, handleDataBoxClick }) => {
    const { ids } = translationsData || {};

    useEffect(() => {
    }, [translationsData]);

    const tableContent = ids?.length
        ? ids.map((translationId) => (
            <Translation
                key={translationId}
                translationId={translationId}
                onClick={handleDataBoxClick}
            />
        ))
        : null;

    return (
        <div className='main-container'>
            <div className="translation-table-titles">
                <div className="translation-info">
                    <h3>Username</h3>
                    <h3>Source Language</h3>
                    <h3>Target Language</h3>
                    <h3>Requested Text</h3>
                    <h3>Translated Text</h3>
                </div>
            </div>
            {/* Scrollable container for the list */}
            <div className="translation-list-container">
                <div className="translation-table-content">{tableContent}</div>
            </div>
        </div>
    );
};

export default TranslationList;





