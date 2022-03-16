import ChiefCard from "./ChiefCard";

export default function ChiefsSection() {
  const chiefs = [
    {
      name: "Sanjyot keer",
      img: "/img/top-chiefs/img_1.jpg",
      channel: "Your Food Lab",
      yt: "https://www.youtube.com/c/YourFoodLab/",
      insta: "https://www.instagram.com/yourfoodlab/",
    },
    {
      name: "Yaman Agarwal",
      img: "/img/top-chiefs/img_2.jpg",
      channel: "Cooking Shooking",
      yt: "https://www.youtube.com/c/CookingshookingIn/",
      insta: "https://www.instagram.com/yaman.ag/",
    },
    {
      name: "Hema Subramanian",
      img: "/img/top-chiefs/img_3.jpg",
      channel: "Home Cooking Show",
      yt: "https://www.youtube.com/c/HomeCookingShow/",
      insta: "https://www.instagram.com/homecookingshow/",
    },
    {
      name: "Varun Inamdar",
      img: "/img/top-chiefs/img_4.jpg",
      channel: "Get Curried",
      yt: "https://www.youtube.com/c/getcurried/",
      insta: "https://www.instagram.com/getcurried/",
    },
    {
      name: "Archana",
      img: "/img/top-chiefs/img_5.jpg",
      channel: "Hebbars Kitchen",
      yt: "https://www.youtube.com/channel/UCPPIsrNlEkaFQBk-4uNkOaw/",
      insta: "https://www.instagram.com/hebbars.kitchen/",
    },
    {
      name: "Kunal Kapoor",
      img: "/img/top-chiefs/img_6.jpg",
      channel: "Kunal Kapoor",
      yt: "https://www.youtube.com/c/KunalKapur/",
      insta: "https://www.instagram.com/chefkunal/",
    },
  ];
  return (
    <div className="section chiefs">
      <h1 className="title">My Favourite Chefs</h1>
      <div className="top-chiefs-container">
        {chiefs.map((chief) => (
          <ChiefCard key={chief.name} chief={chief} />
        ))}
      </div>
    </div>
  );
}
