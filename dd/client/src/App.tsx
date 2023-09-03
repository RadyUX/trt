
import JobCard from './component/Card'
import Sidebar from './component/SideBar'
import './index.css'

function App() {
 
  return (
    <div className="relative">
            <div className="p-4">
            <JobCard 
  title="Développeur Frontend"
  location="Paris, France"
  description="Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique..."
/>
<JobCard 
  title="Développeur Backend"
  location="Paris, France"
  description="Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique..."
/>
<JobCard 
  title="Développeur Java"
  location="Paris, France"
  description="Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique..."
/>

            </div>
            <Sidebar isLoggedIn={false} />
        </div>
  )
}

export default App
