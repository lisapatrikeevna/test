const handleShareOnLinkedIn = (link: string) => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
};

export default handleShareOnLinkedIn;
