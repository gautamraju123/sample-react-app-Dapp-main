import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
// import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
import { getCarData } from "../api/actions";

const CarCard: React.FC = () => {
  const [data, setData] = useState<CarData>();
  const [loadingState, setLoadingState] = useState(false);
  const [Car, setCar] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Car Data...");
    console.log(Car);
    setLoadingState(true);
    getCarData(Car)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="Carname"
              type="text"
              label="Car"
              value={Car}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCar(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">{data.Car}</h1>
          {data.Speed > 50 && data.Price > 50 ? (
            <div>
              {/* <RiEmotionHappyLine className="w-36 h-36" /> */}
            </div>
          ) : (
            <div>
              {/* <RiEmotionUnhappyLine className="w-36 h-36" /> */}
            </div>
          )}
          <p className="text-xl">Speed: {data.Speed} mph</p>
          <p className="text-lg">Price: £ {data.Price} </p>
          <p className="text-lg">Safety: {data.Safety} </p>
          <p className="text-lg">Colour: {data.Colour} </p>
        </div>
      </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a name of Car</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
