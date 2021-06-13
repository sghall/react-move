import enzyme from 'enzyme/build/index'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

enzyme.configure({ adapter: new Adapter() })
