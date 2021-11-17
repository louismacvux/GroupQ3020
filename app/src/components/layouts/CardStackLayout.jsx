import Card from './Card/Card';

const CardStackLayout = ({ children }) => {
     return (
          <div className="flex flex-col gap-8">
               {
                    children.map((child, index) => (
                         <Card key={index} header={child.props.header}>
                              {
                                   child
                              }
                         </Card>
                    ))
               }
          </div>
     )
}

export default CardStackLayout
