module.exports = function(text, characters) {
    if (text.length < characters) return text; 
    var newText = text.slice(0, characters),
        len = newText.length,
        isSpace = (newText.slice(len - 3, len - 2) === ' '),
        offset = isSpace ? 3 : 2;
    return newText.slice(0, len - offset) + '...';
};