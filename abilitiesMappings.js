import abilities from "./abilities.js"

const parseAbilities = () => {
  const parsedData = {}
  for (let key in abilities) {
    const seperatedData = abilities[key
    ].split(',')
    parsedData[seperatedData[0]] = {
      id: key,
      name: seperatedData[0],
      // Primary Ability [X] Effects
      activationType: seperatedData[10], // refer to activationTypes in types.js
      activationCount_1: seperatedData[13], // the [activationType] count needed to trigger skill
      activationCount_2: seperatedData[14],
      activationCap: seperatedData[15], // max # of [activationType]s of skill
      elementInParty: seperatedData[16],
      skillType: seperatedData[17], // a mapping to determine the modifier of the leader skill
      elementForSkill: seperatedData[19], // the element being modified
      skillValue_1: seperatedData[20],
      skillValue_2: seperatedData[21],
      hpAboveOrBelow: seperatedData[27], // 0 is above, 1 is below
      hpRequirementTarget: seperatedData[28],
      elementforHPRelated: seperatedData[29],
      hpRequirement_1: seperatedData[30],
      hpRequirement_2: seperatedData[31],
      hpBelow_1: seperatedData[32],
      hpBelow_2: seperatedData[33],
      hpSkillTarget: seperatedData[34],
      hpAttackAdd_1: seperatedData[36], // + XX% to Attack Damage to characters based on ['hpAtOrBelow', 'elementforHPRelated']
      hpAttackAdd_2: seperatedData[37],
      attackMulti_1: seperatedData[38],
      attackMulti_2: seperatedData[39],
      // Secondary Ability [X] Effects
      activationTypeSecond: seperatedData[50], // refer to activationTypes in types.js
      activationCountSecond_1: seperatedData[53], // the [activationType] count needed to trigger skill
      activationCountSecond_2: seperatedData[54],
      activationCapSecond: seperatedData[55], // max # of [activationType]s of skill
      skillTypeSecond: seperatedData[57], // a mapping to determine the modifier of the leader skill
      targetAllUnitElementSecond: seperatedData[59], // the element being modified
      skillValueSecond_1: seperatedData[60],
      skillValueSecond_2: seperatedData[61],
    }
  }
  return parsedData
}

export default parseAbilities()