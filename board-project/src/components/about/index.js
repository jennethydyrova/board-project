import React from "react";
import "antd/dist/antd.css";
import {PageHeader, Typography} from "antd"

const {Title} = Typography;
const {Paragraph} = Typography;
const pageTitle = <Title className="about-title">
About
</Title>

const jennet = <a href="https://github.com/jennethydyrova">Jennet HYDYROVA</a>;
const majd = <a href="https://github.com/majdajroudi">Majd AJROUDI</a>;
const recoded =<a href="https://www.re-coded.com/istanbul-coding-bootcamp-spring-2020"> Re:coded Frontend Development Bootcamp</a>;


const aboutText = `This website was designed by ${<a href="https://github.com/jennethydyrova">Jennet HYDYROVA</a>} and ${majd} as a project for the \
                  ${recoded} \
                  ReactJS framework was used to add the functionalities provided in the website.\
                 Firebase was used to create and manage the database\
                  Ant design was used to style the website`


const About = () => {
  return (
    <>
      <PageHeader title={pageTitle}> 
        <Paragraph className="about">
        This website was designed by {jennet} and {majd} as a project for the 
                   {recoded}. 
                  ReactJS framework was used to add the functionalities provided in the website.
                 Firebase was used to create and manage the database
                  Ant design was used to style the website.
        </Paragraph>
      </PageHeader>
      
    </>
  );
};

export default About;
