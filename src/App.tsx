import Hero from './components/Hero/Hero'
import Modules from './components/Modules/Modules'
import DesignPhilosophy from './components/DesignPhilosophy/DesignPhilosophy'
import McpTools from './components/McpTools/McpTools'
import Skills from './components/Skills/Skills'
import GroupPreview from './components/GroupPreview/GroupPreview'
import QuickStart from './components/QuickStart/QuickStart'
import Upgrade from './components/Upgrade/Upgrade'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Hero />
      <Modules />
      <McpTools />
      <GroupPreview />
      <DesignPhilosophy />
      <Skills />
      <div id="quick-start">
        <QuickStart />
      </div>
      <Upgrade />
      <Footer />
    </>
  )
}

export default App
