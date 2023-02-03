import fs from 'fs'
jest.mock('fs')



describe('FS', () => {
  it('works', () => {
    fs.readFileSync = jest.fn().mockReturnValue('123')
    expect(fs.readFileSync('123')).toBe('123')
  })
})