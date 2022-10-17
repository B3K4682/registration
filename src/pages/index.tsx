// Next Imports
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

// Import Axios
import axios from "axios";

// Import Components
import { Form } from "../components";

// Import Types
import { Car } from "../util/types";

// Import react toast
import { Toaster } from "react-hot-toast";

// Define Props Interface
interface IHomeProps {
  data: Car;
}

const Home: NextPage<IHomeProps> = ({ data }) => {
  return (
    <main>
      <Head>
        <title>Registration flow</title>
      </Head>
      <Form data={data} />
      <Toaster />
    </main>
  );
};

// ?I don't know car models well, so I used a random API to get the data :)
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(
    "https://private-anon-b94f339c60-carsapi1.apiary-mock.com/cars"
  );
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};

export default Home;
