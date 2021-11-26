import { Divider, Spacer } from '@chakra-ui/react';
import { motion, motionValue } from 'framer-motion';
import { useState, Children } from 'react';
import Card from './Card'
import CardTitle from './CardTitle';

const CollapsibleCard = (props) => {

     let { children, title, leftIcon, rightIcon, variant, onClick, size = "md" } = props;
     let [isOpen, setOpen] = useState(false);

     const variants = {
          open: { height: "100%" },
          closed: { height: "0px" },
     }

     return (
          <Card className="flex flex-col cursor-pointer">
               <CardTitle size={size} onClick={() => setOpen(!isOpen)} leftIcon={leftIcon} rightIcon={rightIcon} variant={variant}>{title}</CardTitle>
               <motion.div
                    initial={{ height: "0px" }}
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}
                    className="overflow-hidden flex flex-col gap-8"
                    transition={{ ease: "easeOut", duration: 1 / 3 }}
               >
                    <Spacer size="8" />
                    {
                         children
                    }
               </motion.div>
          </Card >
     )

}

export default CollapsibleCard
