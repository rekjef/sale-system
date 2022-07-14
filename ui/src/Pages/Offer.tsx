import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
import { useGlobalContext } from '../UserContext';

type offerType = {
  id: number,
  title: string,
  description: string,
  image: string,
  category: string,
  price: number,
  condition: string,
  date: string,
};

function Home() {
  const { user } = useGlobalContext();
  const { offerID } = useParams();
  const [offer, setOffer] = useState<offerType | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/get-offer/${offerID}`);
      setOffer(response.data.offer);
    })();
  }, []);

  return (
    <div>
      <Container className="klasa">
        {offer?.title}
      </Container>
    </div>
  );
}

export default Home;
