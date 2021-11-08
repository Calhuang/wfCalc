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
      nameSecond: seperatedData[41], // name of unit, indicator of secondary effect
      activationTypeSecond: seperatedData[51], // refer to activationTypes in types.js
      activationCountSecond_1: seperatedData[54], // the [activationType] count needed to trigger skill
      activationCountSecond_2: seperatedData[55],
      activationCapSecond: seperatedData[56], // max # of [activationType]s of skill
      skillTypeSecond: seperatedData[58], // a mapping to determine the modifier of the leader skill
      targetAllUnitElementSecond: seperatedData[60], // the element being modified
      skillValueSecond_1: seperatedData[61],
      skillValueSecond_2: seperatedData[62],
      hpAboveOrBelowSecond: seperatedData[68], // 0 is above, 1 is below
      hpRequirementTargetSecond: seperatedData[69],
      elementforHPRelatedSecond: seperatedData[70],
      hpRequirementSecond_1: seperatedData[71],
      hpRequirementSecond_2: seperatedData[72],
      hpBelowSecond_1: seperatedData[73],
      hpBelowSecond_2: seperatedData[74],
      hpSkillTargetSecond: seperatedData[75],
      unknownElementTarget: seperatedData[76],
      hpAttackAddSecond_1: seperatedData[77], // + XX% to Attack Damage to characters based on ['hpAtOrBelow', 'elementforHPRelated']
      hpAttackAddSecond_2: seperatedData[78],
      attackMultiSecond_1: seperatedData[79],
      attackMultiSecond_2: seperatedData[80],
    }
  }
  return parsedData
}

export default parseAbilities()