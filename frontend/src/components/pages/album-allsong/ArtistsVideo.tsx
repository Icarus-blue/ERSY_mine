'use client'
import { StaticImageData } from "next/image";
import SongUpgradeTableRow from "./SongUpgradeTableRow";
import VideoCard from "../home/VideoCard";
import ShortMusicVideo from "@/components/shared/ShortMusicVideo";
import { fetchData } from "@/utils/fetchData";
import { useState, useEffect } from "react";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import SelectBoxNew from "@/components/shared/SelectBoxNew";
import Link from "next/link";

type Props = {
  sectionTitle: string;
  artist: string
};

const sortMode = [
  { label: "Most Views" },
  { label: "Recent First" },
  { label: "Old First" },
];

const ArtistsVideo = ({ sectionTitle, artist }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState(null)
  const [queryobj, setQueryObj] = useState({
    genre: 'All Songs',
    sortMode: 'Most Views',
  });

  const handleSearch = () => {

  }

  const handleSortChange = (newSortMode: { label: string }) => {
    console.log(newSortMode);
    setQueryObj(prevState => ({
      ...prevState,
      sortMode: newSortMode.label,
    }));
  };

  useEffect(() => {
    const getArtistsVideos = async () => {
      try {
        const data = await fetchData('/data/videos', 1, 32, artist)
        setVideos(data.videos)
        console.log(data.videos)
      } catch (error) {
        console.log(error);
      }
    }
    getArtistsVideos()
  }, [])

  return (

    <section className="trending__section pr-24 pl-24 pb-100">
      <div className="trending__selected mb-30 d-flex align-items-center justify-content-center justify-content-lg-between">
        <div className="select__lefts d-flex align-items-center">
          <form
            onSubmit={handleSearch}
            className="d-flex align-items-center justify-content-between"
          >
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search..." />
            <button type="submit" aria-label="submit button">
              <IconSearch />
            </button>
          </form>
          <SelectBoxNew
            options={sortMode}
            value={queryobj.sortMode}
            onChange={(newValue) => handleSortChange(newValue)} // Handle changes
          />
        </div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              ALL SONGS
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
              aria-label="profile-tab"
            >
              MUSIC VIDEOS
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              aria-label="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              INTERVEIWS
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link "
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#pop-tab-pane"
              type="button"
              role="tab"
              aria-controls="pop-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              GALLERY
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#reggae-tab-pane"
              type="button"
              role="tab"
              aria-controls="reggae-tab-pane"
              aria-selected="false"
              aria-label="profile-tab"
            >
              COLLABORATIONS
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              aria-label="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#jazz-tab-pane"
              type="button"
              role="tab"
              aria-controls="jazz-tab-pane"
              aria-selected="false"
            >
              TWITTER
            </button>
          </li>
        </ul>
      </div>
      <div className="container-fluid">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-4">
              {videos && (
                <>
                  {videos.map(({ id, ...props }: any) => (
                    <div
                      key={id}
                      className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                    >
                      <VideoCard key={id} {...props} link="album-allsong" />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="text-center mt-60 " >
              <Link href="#" onClick={async (e) => {
                e.preventDefault()
                setIsLoading(true)
                const data = await fetchData('/data/videos', currentPage === 0 ? 3 : currentPage + 1, 32,artist)
                setVideos(prev => ([...prev, ...data.videos]))
                setCurrentPage(prev => prev + 1)
                setIsLoading(false)
              }} className="cmn__simple2" >
                {isLoading ? 'loading...' : 'Load More'}
              </Link>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row g-4">
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pop-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="reggae-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="jazz-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsVideo;
