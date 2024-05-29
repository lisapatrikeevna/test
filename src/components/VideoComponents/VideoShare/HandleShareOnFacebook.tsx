const handleShareOnFacebook = (link: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
};

export default handleShareOnFacebook;
