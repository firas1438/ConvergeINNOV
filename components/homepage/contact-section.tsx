"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { EnvelopeClosedIcon, MobileIcon, DrawingPinIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import ContactForm from "./forms/contactform";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative max-w-screen-xl w-full mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      {/* background gradient top right */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.2 }}
        className="absolute top-[150px] right-[-120px] w-[250px] h-[250px] bg-gradient-to-br from-[#a4579f] to-[#ffa5ff] opacity-20 blur-[150px] rounded-full pointer-events-none z-0"
      />

      {/* header */}
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Contact
        </h4>
        <p className="max-w-xl text-muted-foreground text-center pb-2">
          For any questions or business inquiries, please don&rsquo;t hesitate
        </p>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4 ">
        {/* contact form*/}
        <motion.div className="flex-[1.5]">

          <Card className="h-full bg-gradient-to-br from-card/80 via-card to-card/60 p-5" style={{ transform: "scale(0.97)" }}>

            {/* header */}
            <CardHeader className="flex-col items-start pb-0 mb-2">
              <h3 className="text-xl font-bold text-primary"> Send Us a Message </h3>
              <p className="text-sm text-default-500"> We&rsquo;ll respond within 24 hours </p>
            </CardHeader>
            
            {/* form */}
            <CardBody className="gap-3">
              <ContactForm />
            </CardBody>

          </Card>
        </motion.div>

        {/* contact info */}
        <motion.div className="flex-1">
          <Card
            className="h-full bg-gradient-to-br from-card/80 via-card to-card/60 p-5"
            style={{ transform: "scale(0.97)" }}
          >
            <CardHeader className="flex-col items-start pb-0 mb-3">
              <h3 className="text-xl font-bold text-primary">
                Contact Information
              </h3>
              <p className="text-sm text-default-500">
                Connect with us directly
              </p>
            </CardHeader>
            <CardBody className="gap-4">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="p-2 bg-primary/10 rounded-lg text-primary"
                >
                  <EnvelopeClosedIcon className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-default-500">contact@convergeinnov.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="p-2 bg-primary/10 rounded-lg text-primary"
                >
                  <MobileIcon className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <div className="grid grid-cols-2 gap-x-8 text-default-500">
                    <p>+216 23198524</p>
                    <p>+216 97131795</p>
                    <p>+33 667563880</p>
                    <p>+974 50690165</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="p-2 bg-primary/10 rounded-lg text-primary"
                >
                  <DrawingPinIcon className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-default-500">
                    France: 135 Rue Du Plessis Bouchard 95130 Francoville
                  </p>
                  <p className="text-default-500">
                    Tunisia: B19 Pole Technologique 4054 Sahloul
                  </p>
                </div>
              </div>

              <div>
                <a
                  href="https://www.linkedin.com/company/convergeinnov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="p-2 bg-primary/10 rounded-lg text-primary"
                  >
                    <LinkedInLogoIcon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-default-500">ConvergeINNOV</p>
                  </div>
                </a>
              </div>
            </CardBody>
          </Card>
        </motion.div>
        
      </div>
    </motion.section>
  );
}