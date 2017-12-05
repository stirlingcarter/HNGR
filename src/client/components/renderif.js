export default function renderIf(cond, content) {
    if (cond) {
        return content;
    }
    else {
        return null;
    }
}

// Inspiration from https://kylewbanks.com/blog/how-to-conditionally-render-a-component-in-react-native