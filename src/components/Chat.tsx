import React, { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    const loadChat = () => {
      var Tawk_API = window.Tawk_API || {};
      var Tawk_LoadStart = new Date();
      
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/6806df258e49a91911cf3225/1ipddfavq';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    };

    loadChat();

    return () => {
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
      const tawkIframe = document.getElementById('tawk-iframe');
      if (tawkIframe) {
        tawkIframe.remove();
      }
    };
  }, []);

  return null;
};

export default Chat;