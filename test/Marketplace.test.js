const Bidding = artifacts.require('./Bidding.sol')

contract('Bidding', ([government, company]) => {
  let biddingPlatform

  before(async () => {
    biddingPlatform = await Bidding.deployed()
  })

  describe('Deployment', async () => {
    it('Deploys to the blockchain', async () => {
      const address = await biddingPlatform.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('Has the correct name', async () => {
      const name = await biddingPlatform.name()
      assert.equal(name, 'Gobid Bidding Platform')
    })

    it('Has the correct entity', async () => {
        const entity = await biddingPlatform.biddingEntity()
        assert.equal(entity, 'Test Government')
    })
  })

  describe('Contracts', async () => {
    let result, contractCount

    before(async () => {
        result = await biddingPlatform.createContract("Bridge Contract","Roads & Bridges", "Buenos Aires", "1.000.000 Euros", "May, 2020", "May 2022", false)
        contractCount = await biddingPlatform.contractCount()
    })

    it('Can create contracts', async () => {
      assert.equal(contractCount, 1)
      
      const event = result.logs[0].args
      assert.equal(event.contractId.toNumber(), contractCount.toNumber(), 'match')
      assert.equal(event.contractTitle, 'Bridge Contract', 'title matches')
      assert.equal(event.contractLocation, 'Buenos Aires', 'location matches')
    })

    it('Can assign contracts', async () => {
        result = await biddingPlatform.assignContract(contractCount, company)
      
        const event = result.logs[0].args
        assert.equal(event.contractId.toNumber(), contractCount.toNumber(), 'id is correct')
        assert.equal(event.contractTitle, 'Bridge Contract', 'title matches')
        assert.equal(event.contractLocation, 'Buenos Aires', 'location matches')
        assert.equal(event.contractCompany, company, 'contract company is correct')
        assert.equal(event.assigned, true, 'contract assignment status is correct')
      
    })
  })
})