import LandingPageStyles from '../styles/LandingPage.module.css'
import LandingPageDisplay from '../components/LandingPageDisplay'
import LandingPageSidebar from '../components/LandingPageSidebar'
import useMediaQuery from '../hooks/MediaQuery'

export default function Home() {
  const isBreakPoint = useMediaQuery(720)

  return (
    <div className={LandingPageStyles.landingPage}>
      <LandingPageDisplay />
      <LandingPageSidebar />
    </div>
  )
}

{/* <>
{ isBreakPoint ? (
  <div className={LandingPageStyles.landingPage}>
    <LandingPageDisplay />
  </div>
) : (
  <div className={LandingPageStyles.landingPage}>
    <LandingPageDisplay />
    <LandingPageSidebar />
  </div>
)
}
</> */}