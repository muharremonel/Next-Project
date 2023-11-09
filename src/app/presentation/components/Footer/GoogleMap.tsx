import React from 'react';

const GoogleMap: React.FC = () => {
    return (
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12030.005460961454!2d28.9766022!2d41.079891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab711a08b8023%3A0x663279f2d7adf46d!2zS2HEn8SxdGhhbmUgQmVsZWRpeWVzaSBHZW7DpyBWYWRp!5e0!3m2!1str!2str!4v1696604739122!5m2!1str!2str"
            width="100%"
            height="260"
            style={{border:0, borderRadius:"15px"}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
        </iframe>
    );
}

export default GoogleMap;
