import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const topics = [
  "For You",
  "Health",
  "Science",
  "Business",
  "Education",
  "Sports",
  "Entertainment",
  "Travel",
  "Lifestyle",
  "Food"
];

const CarouselTopics = () => {
  return (
    <>
      <div className="flex flex-col py-3 px-5">
        <div className="border-b py-3 px-16 max-w-[680px] ">
          <Carousel
            opts={{
              align: "start",
            }}
            className=""
          >
            <CarouselContent className="thd:max-w-[200px] fhd:max-w-[300px] sm:max-w-md md:max-w-lg lg:max-w-xl ehd:max-w-2xl">
              {topics.map((topic, index) => (
                <CarouselItem key={index} className="basis-1/7">
                  <Card className="w-fit border-none">
                    <CardContent className="flex items-center justify-center py-1">
                      <span className="text-xs">{topic}</span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CarouselTopics;
