const handleShareOnX = (link: string) => {
    const XUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
    window.open(XUrl, '_blank', 'width=600,height=400');
};

export default handleShareOnX;