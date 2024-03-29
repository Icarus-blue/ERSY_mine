import CommonDetails from "@/components/pages/album-details/CommonDetails";
import ConveterHead from "@/components/pages/album-details/ConveterHead";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Album Details - Ersy Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Ersy Multipurpose Audio Podcast & Music Nextjs Template",
};
const albumDetails = () => {
  return (
    <>
      <CommonDetails>
        <ConveterHead name="Chester Bennington" songTitle="44m" />
      </CommonDetails>
    </>
  );
};

export default albumDetails;
