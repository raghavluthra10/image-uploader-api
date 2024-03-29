import * as React from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import If from "../../components/If";
import {
  Button as ChakraButton,
  Spinner,
  Flex,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import ImageBox from "../../components/ImageBox";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCloudUpload } from "react-icons/io";
import { uploadImage } from "../../api/mutations";
import { getAllImagesOfAUser } from "../../api/queries";
import { ImageInfo } from "../../interfaces";
// export interface IAppProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  align-items: center;
  @media (max-width: 750px) {
    padding: 12px 20px;
  }
`;

const UserInfo = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 116px;
  border-radius: 8px;
  padding: 16px;
  width: 80%;
  box-shadow: 2px 2px 4px #333;
  min-width: 300px;
  @media (max-width: 560px) {
    padding: 4px;
    height: 128px;
  }
`;

const PhotosDisplaySection = styled.section`
  margin-top: 64px;
  padding: 32px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  max-width: 80%;
  align-items: center;
  grid-gap: 48px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 650px) {
    padding: 16px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function App() {
  const userName = window.localStorage.getItem("userName");

  const [file, setFile] = React.useState<any>(null);
  const [showUploadButton, setShowUploadButton] =
    React.useState<boolean>(false);

  const fetchAllImagesOfMe = useQuery({
    queryKey: ["getMyImages"],
    queryFn: getAllImagesOfAUser,
    refetchOnWindowFocus: false,
  });

  // describe mutation upload image and its side effect
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onMutate: (variable) => {
      return variable;
    },
    onError: (error, variables, context) => {
      console.log("error =>", error, variables, context);
    },
    onSuccess: async (data, variables, context) => {
      setShowUploadButton(false);
      // re-fetch updated data
      fetchAllImagesOfMe.refetch();
    },
  });

  // call the upload image mutation on click of upload button
  const uploadPhoto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    uploadImageMutation.mutate(formData);
  };

  // ref for hidden input tag for file upload
  const hiddenButtonRef = React.useRef<HTMLInputElement>(null);

  // triggering click on behalf of hidden input tag
  const implementUseRef = () => {
    if (hiddenButtonRef.current != null) {
      hiddenButtonRef.current.click();
    }
  };

  const fetchFile = (e: any) => {
    setFile(e.target.files[0]);
    setShowUploadButton(true);
  };

  const cancelFormSubmission = () => {
    setFile(null);
    setShowUploadButton(false);
  };

  const [rearrangeButtonsForUploadingFile] =
    useMediaQuery("(max-width: 560px)");

  return (
    <React.Fragment>
      <If condition={uploadImageMutation.isLoading}>
        <Flex alignItems="center" direction="column">
          <Spinner
            mt="124px"
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </If>
      <If condition={!uploadImageMutation.isLoading}>
        <Container>
          <UserInfo>
            <Flex p="16px" flexDirection="column">
              <div>Name: {userName}</div>
              <div>Photos: {fetchAllImagesOfMe?.data?.length}</div>
            </Flex>
            <Flex p="16px">
              <form
                onSubmit={uploadPhoto}
                method="post"
                encType="multipart/form-data"
              >
                <If condition={showUploadButton}>
                  {rearrangeButtonsForUploadingFile ? (
                    <Flex flexDirection="column" gap={2}>
                      <ChakraButton type="submit">Upload</ChakraButton>

                      <IconButton aria-label="" onClick={cancelFormSubmission}>
                        <ImCancelCircle />
                      </IconButton>
                    </Flex>
                  ) : (
                    <Flex gap={2}>
                      <ChakraButton type="submit">Upload</ChakraButton>

                      <IconButton aria-label="" onClick={cancelFormSubmission}>
                        <ImCancelCircle />
                      </IconButton>
                    </Flex>
                  )}
                </If>
                <input
                  ref={hiddenButtonRef}
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={fetchFile}
                />

                <If condition={!showUploadButton}>
                  <IconButton aria-label={""} onClick={implementUseRef}>
                    <IoMdCloudUpload
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--secondary)",
                        height: "100%",
                        width: "100%",
                        alignSelf: "center",
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>
                </If>
              </form>
            </Flex>
          </UserInfo>

          <PhotosDisplaySection>
            <If condition={!fetchAllImagesOfMe.isLoading}>
              <If condition={fetchAllImagesOfMe.data?.length > 0}>
                {fetchAllImagesOfMe?.data?.map((image: ImageInfo) => (
                  <ImageBox
                    key={image.id}
                    src={image.firebase_public_url}
                    alt="image"
                  />
                ))}
              </If>
              <If condition={fetchAllImagesOfMe.data?.length === 0}>
                <h1 style={{ alignSelf: "center" }}>No images</h1>
              </If>
            </If>
            <If condition={fetchAllImagesOfMe.isLoading}>
              {fetchAllImagesOfMe?.data?.map((image: any) => (
                <Flex alignItems="center" direction="column" key={image.id}>
                  <Spinner
                    mt="124px"
                    thickness="4px"
                    speed="0.8s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Flex>
              ))}
            </If>
          </PhotosDisplaySection>
        </Container>
      </If>
    </React.Fragment>
  );
}
