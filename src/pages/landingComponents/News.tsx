import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Modal from "../../components/Modal";
import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";
import NeuButton from "../../components/neumorphism/button/NeuButton";
import useOnScreen from "../../components/hooks/useOnScreen.ts";

interface NewsItem {
  title: string;
  content: string;
  fullContent: string;
}

const news: NewsItem[] = [
  {
    title: "Some news 1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed eget risus porta, tincidunt turpis at, interdum tortor.`,
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
  {
    title: "Some news 2",
    content: "Sed eget risus porta, tincidunt turpis at, interdum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
  {
    title: "Some news 3",
    content: "Pellentesque habitant morbi tristique senectus et netus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
  {
    title: "Some news 4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
  {
    title: "Some news 5",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
       Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
  {
    title: "Some news 6",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fullContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, interdum tortor.
       Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`,
  },
];

const News: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    let timer: number | undefined;

    if (isVisible && visibleCards.length < news.length) {
      timer = window.setTimeout(() => {
        setVisibleCards((prev) => [...prev, prev.length]);
      }, 150);
    } else if (!isVisible && visibleCards.length !== 0) {
      setVisibleCards([]);
    }

    return () => clearTimeout(timer);
  }, [isVisible, visibleCards.length]); // Убедитесь, что зависимости указаны корректно

  const handleOpenModal = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  return (
      <Container sx={{ padding: "20px" }} ref={containerRef}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
            News
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {news.map((item, index) => (
              <Grid item key={index} xs={6} md={4}>
                <NeuCard
                    in={visibleCards.includes(index)} // Передаем состояние видимости
                    elevation={3}
                    rounded
                    sx={{
                      padding: "0",
                      margin: "16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: 'start'
                    }}
                >
                  <NeuCardHeader title={item.title} sx={{ pb: 0, mt: 1 }} />
                  <NeuCardContent>
                    <Box sx={{}}>
                      <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ flexGrow: 1, marginBottom: "16px" }}
                      >
                        {item.content}
                      </Typography>
                      <NeuButton
                          onClick={() => handleOpenModal(item)}
                          rounded
                      >
                        Read more
                      </NeuButton>
                    </Box>
                  </NeuCardContent>
                </NeuCard>
              </Grid>
          ))}
        </Grid>
        <Modal
            isOpen={selectedNews !== null}
            onClose={handleCloseModal}
            height="auto"
            width="600px"
        >
          {selectedNews && (
              <>
                <Typography variant="h6" gutterBottom>
                  {selectedNews.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedNews.fullContent}
                </Typography>
              </>
          )}
        </Modal>
      </Container>
  );
};

export default News;
