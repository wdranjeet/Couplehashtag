// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const partner1Input = document.getElementById('partner1');
    const partner2Input = document.getElementById('partner2');
    const generateBtn = document.getElementById('generateBtn');
    const resultsSection = document.getElementById('resultsSection');
    const hashtagList = document.getElementById('hashtagList');

    // Generate hashtags when button is clicked
    generateBtn.addEventListener('click', generateHashtags);

    // Also allow Enter key to generate
    partner1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateHashtags();
    });
    partner2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateHashtags();
    });

    function generateHashtags() {
        const name1 = partner1Input.value.trim();
        const name2 = partner2Input.value.trim();

        if (!name1 || !name2) {
            alert('Please enter both partner names!');
            return;
        }

        const hashtags = createHashtags(name1, name2);
        displayHashtags(hashtags);
    }

    function createHashtags(name1, name2) {
        const n1 = capitalizeFirst(name1);
        const n2 = capitalizeFirst(name2);
        const n1Lower = name1.toLowerCase();
        const n2Lower = name2.toLowerCase();

        // Get initials
        const init1 = n1.charAt(0).toUpperCase();
        const init2 = n2.charAt(0).toUpperCase();

        // Create various hashtag combinations
        const hashtags = [];

        // Merged names
        hashtags.push(`#${n1}${n2}`);
        hashtags.push(`#${n2}${n1}`);

        // Love variations
        hashtags.push(`#${n1}${n2}Love`);
        hashtags.push(`#${n1}Loves${n2}`);
        hashtags.push(`#${n2}Loves${n1}`);

        // Forever variations
        hashtags.push(`#Forever${n1}${n2}`);
        hashtags.push(`#${n1}And${n2}Forever`);

        // Initials combinations
        hashtags.push(`#${init1}${init2}Love`);
        hashtags.push(`#${init1}x${init2}`);
        hashtags.push(`#${init1}And${init2}`);

        // Wedding/Together variations
        hashtags.push(`#${n1}${n2}Wedding`);
        hashtags.push(`#${n1}Weds${n2}`);
        hashtags.push(`#${n1}${n2}Together`);

        // Merged first parts (if names are long enough)
        if (n1.length >= 3 && n2.length >= 3) {
            const merged1 = n1.substring(0, Math.min(4, n1.length)) + 
                          n2.substring(Math.max(0, n2.length - 3));
            const merged2 = n2.substring(0, Math.min(4, n2.length)) + 
                          n1.substring(Math.max(0, n1.length - 3));
            hashtags.push(`#${merged1}`);
            hashtags.push(`#${merged2}`);
        }

        // Year variations (current year)
        const year = new Date().getFullYear();
        hashtags.push(`#${n1}${n2}${year}`);

        // Special combinations
        hashtags.push(`#${n1}Plus${n2}`);
        hashtags.push(`#The${n1}${n2}s`);
        hashtags.push(`#${n1}And${n2}`);

        // Remove duplicates and limit to top suggestions
        return [...new Set(hashtags)].slice(0, 12);
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function displayHashtags(hashtags) {
        hashtagList.innerHTML = '';
        
        hashtags.forEach(hashtag => {
            const item = document.createElement('div');
            item.className = 'hashtag-item';
            
            const text = document.createElement('span');
            text.className = 'hashtag-text';
            text.textContent = hashtag;
            
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';
            
            // Copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '📋 Copy';
            copyBtn.onclick = () => copyToClipboard(hashtag, copyBtn);
            
            // Share buttons
            const instagramBtn = createShareButton('Instagram', '📷', hashtag, 'instagram');
            const whatsappBtn = createShareButton('WhatsApp', '💬', hashtag, 'whatsapp');
            const twitterBtn = createShareButton('X', '🐦', hashtag, 'twitter');
            const arataiBtn = createShareButton('Aratai', '✨', hashtag, 'aratai');
            
            buttonGroup.appendChild(copyBtn);
            buttonGroup.appendChild(instagramBtn);
            buttonGroup.appendChild(whatsappBtn);
            buttonGroup.appendChild(twitterBtn);
            buttonGroup.appendChild(arataiBtn);
            
            item.appendChild(text);
            item.appendChild(buttonGroup);
            hashtagList.appendChild(item);
        });
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard');
        });
    }

    function createShareButton(platform, emoji, hashtag, className) {
        const btn = document.createElement('button');
        btn.className = `share-btn ${className}`;
        btn.innerHTML = `${emoji}`;
        btn.title = `Share on ${platform}`;
        btn.onclick = () => shareHashtag(platform, hashtag);
        return btn;
    }

    function shareHashtag(platform, hashtag) {
        const text = `Check out our couple hashtag: ${hashtag}`;
        const encodedText = encodeURIComponent(text);
        const encodedHashtag = encodeURIComponent(hashtag);
        
        let url;
        
        switch(platform) {
            case 'Instagram':
                // Instagram doesn't support direct web sharing with pre-filled text
                // Copy to clipboard and inform user
                copyToClipboard(hashtag, { 
                    textContent: '', 
                    classList: { add: () => {}, remove: () => {} } 
                });
                alert(`Hashtag "${hashtag}" copied! Open Instagram and paste it in your post.`);
                break;
                
            case 'WhatsApp':
                url = `https://wa.me/?text=${encodedText}`;
                window.open(url, '_blank');
                break;
                
            case 'X':
                url = `https://twitter.com/intent/tweet?text=${encodedText}`;
                window.open(url, '_blank');
                break;
                
            case 'Aratai':
                // Generic sharing for Aratai - could be customized if they have a specific API
                copyToClipboard(hashtag, { 
                    textContent: '', 
                    classList: { add: () => {}, remove: () => {} } 
                });
                alert(`Hashtag "${hashtag}" copied! You can now share it on Aratai.`);
                break;
        }
    }
});
