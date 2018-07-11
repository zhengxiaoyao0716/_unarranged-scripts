((title, content) => {
    const translators = {
        H3: node => `[h1]${printNode(node)}[/h1]\n`,
        HR: node => '***\n',
        P: node => `${printNode(node)}\n`,
        FIGURE: node => `[url=${node.querySelector('img').src}]${printNode(node.querySelector('figcaption'))}[/url]\n`,
        '#text': node => node.textContent,
        BR: node => '',
        STRONG: node => `[b]${printNode(node)}[/b]`,
        U: node => `[u]${printNode(node)}[/u]`,
        EM: node => `[i]${printNode(node)}[/i]`,
        S: node => `[strike]${printNode(node)}[/strike]`,
        SPAN: node => {
            const translator = ({
                'spoiler': () => `[spoiler]${printNode(node)}[/spoiler]`,
            })[node.className];
            return translator ? translator() : node.outerHTML;
        },
        IMG: node => `[url=${node.src}]${node.alt}[/url]\n`,
        A: node => `[url=${node.href}]${printNode(node)}[/url]`,
    };
    const printNode = node => Array.prototype.map.call(node.childNodes, node => {
        const translator = translators[node.nodeName];
        return translator ? translator(node) : node.outerHTML;
    }).join('');
    return [
        `[h1]${title.innerText}[/h1]`,
        '',
        '***',
        printNode(content),
        '***',
        `[i]首发于[url=${location.href}]叽咪叽咪[/url][/i]`,
        '',
    ].join('\n');
})( document.querySelector('h1.one_word_title'), document.querySelector('div.show-face.content_p[data-dataid]'));
