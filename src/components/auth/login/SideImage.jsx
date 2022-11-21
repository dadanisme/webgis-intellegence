import person from "../../../assets/images/person.svg";

export default function SideImage() {
  return (
    <aside className="relative w-full h-[300px] hidden lg:flex items-center">
      <div className="absolute h-[226px] w-[226px] bg-[#DDA82A] blur-[158.5px] z-[-3] left-[75px] -top-[27px]"></div>
      <div className="absolute h-[226px] w-[226px] bg-[#4461F2] blur-[158.5px] z-[-3] left-[279px] top-[200px]"></div>
      <div className="w-96">
        <h1 className="text-4xl font-bold">
          Sign In Abbauf Webgis Intelegence
        </h1>
        <p className="mt-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum
        </p>
      </div>
      <img
        src={person}
        alt="person"
        className="h-[349px] absolute right-0 top-0 z-[-1]"
      />
    </aside>
  );
}
