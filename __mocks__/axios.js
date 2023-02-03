
const axios = jest.createMockFromModule('axios');
axios.get = jest.fn().mockResolvedValue({status: 200, data: {}})
axios.post = jest.fn().mockResolvedValue({status: 200, data: {}})
axios.put = jest.fn().mockResolvedValue({status: 200, data: {}})
axios.delete = jest.fn().mockResolvedValue({status: 200})
export default axios