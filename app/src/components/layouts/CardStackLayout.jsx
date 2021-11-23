import Card from './Card/Card';
import { Children } from 'react';

const CardStackLayout = ({ children }) => {
     return (
          <div className="flex flex-col gap-4">
               {
                    Children.map(children, (child, index) => (
                         <Card key={index}>
                              {child}
                         </Card>
                    ))
               }
          </div>
     )
}

export default CardStackLayout
