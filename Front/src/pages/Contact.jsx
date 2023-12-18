import BackBtn from "../components/BackBtn";
import TeamCard from "../components/TeamCard";
import Alfre from "../../public/img/alfre.jpg";
import Angel from "../../public/img/angel.jpg";
import Diego from "../../public/img/diego.jpg";
import Dorian from "../../public/img/dorian.jpg";
import Gonzalo from "../../public/img/gonza.jpg";
import Pablo from "../../public/img/pablo.jpg";
import Rony from "../../public/img/rony.jpg";
import Sergio from "../../public/img/sergio.jpg";


const Contact = () => {
  return (
    <>
      <section className="w-full flex justify-center items-center flex-col bg-neutral">
        <div className="hero min-h-screen h-fit mx-32 bg-base-200">
          <div className="hero-content text-center pt-36 mb-12">
            <div className=" max-w-4xl">
              <h1 className="text-3xl font-bold text-primary">Conocé a nuestro equipo</h1>
              <p className="py-6">
                Nuestros desarrolladores son un grupo multicultural que han
                creado un sistema web que, <br /> <span className=" font-bold"> ¡Es tan increíble como ellos!. </span>
              </p>
              <div className=" flex flex-wrap justify-center items-center">
                <TeamCard
                  name="Backend Dev"
                  pic={Alfre}
                  role="Alfredo Albornoz"
                  tooltip='Guri 🇺🇾'
                />
                <TeamCard
                  name="Frontend Dev"
                  pic={Angel}
                  role="Ángel Gomez"
                  tooltip='Guri 🇺🇾'
                />
                <TeamCard
                  name="DBA"
                  pic={Diego}
                  role="Diego de la Barrera"
                  tooltip='Guri 🇺🇾'
                />
                <TeamCard
                  name="Product Owner"
                  pic={Dorian}
                  role="Dorian Battiato"
                  tooltip='Profe'
                />
                <TeamCard
                  name="Fullstack Dev"
                  pic={Gonzalo}
                  role="Gonzalo Caldoli"
                  tooltip='Pibe 🇦🇷'
                />
                <TeamCard
                  name="DevOps"
                  pic={Pablo}
                  role="Pablo Camejo"
                  tooltip='Guri 🇺🇾'
                />
                <TeamCard
                  name="UI / UX Designer"
                  pic={Rony}
                  role="Rony Romero Duque"
                  tooltip='Parcero 🇨🇴'
                />
                <TeamCard
                  name="Scrum Máster"
                  pic={Sergio}
                  role="Sergio Gende"
                  tooltip='Pibe 🇦🇷'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
