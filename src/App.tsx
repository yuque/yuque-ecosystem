import Hero from './components/Hero/Hero'
import Modules from './components/Modules/Modules'
import McpTools from './components/McpTools/McpTools'
import EditionTabs from './components/EditionTabs/EditionTabs'
import DesignPhilosophy from './components/DesignPhilosophy/DesignPhilosophy'
import Skills from './components/Skills/Skills'
import QuickStart from './components/QuickStart/QuickStart'
import ComingSoon from './components/ComingSoon/ComingSoon'
import Upgrade from './components/Upgrade/Upgrade'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Hero />
      <Modules />
      <McpTools />
      <EditionTabs
        personalContent={
          <>
            <DesignPhilosophy />
            <Skills />
            <div id="quick-start">
              <QuickStart />
            </div>
            <Upgrade />
          </>
        }
        teamContent={<ComingSoon />}
      />
      <Footer />
    </>
  )
}

export default App
