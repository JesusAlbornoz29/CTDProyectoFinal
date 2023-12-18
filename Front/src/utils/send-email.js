import emailjs from 'emailjs-com';

export const sendEmail = (values, templateID) => {


    emailjs.init("NI-x1ujMC01WtLT3Q");

    const serviceID = "service_0wx9raj";
  
    const templateParams1 = {
      to_name: values.firstname,
      email: values.username,
      reply_to: values.username,
    };


    const templateParams2 ={
        email: values.username,
        user_name: values.firstName,
        name: values.name,
        start_date: values.startDate,
        end_date: values.endDate,
        };

    const templateCurrentParams = {
        template_lztv7ki: templateParams1,
        template_lw3vxbg: templateParams2
    }

    emailjs.send(serviceID, templateID, templateCurrentParams[templateID])
      .then(response => response)
      .catch(error => {
        console.error(error)
    });

};


