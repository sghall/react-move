import enzyme from 'enzyme/build/index'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })
