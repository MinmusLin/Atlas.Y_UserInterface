<template>
  <div class='page-container'>
    <div class='container'>
      <h1>FAQs</h1>
      <h2>Q : How to select the appropriate signal peptide or linker peptide?</h2>
      <p><b>A :</b> You can reset your password in the account sign-in page. When you reset your password, instructions
        are sent to the email address associated with your Atlas.Y Web Services account. You can follow the instructions
        in the email to reset your password.</p>
      <h2>Q : What is the difference in the calculations of CAD A-A score and CAD A-S score in the Site-Specific CAD
        Scoring System?</h2>
      <p><b>A :</b> Understanding the difference in calculations between CAD A-A score and CAD A-S score in the CAD
        scoring system is crucial for assessing the preservation of fusion protein functionality. Here are the key
        points to help you grasp this distinction:</p>
      <ol>
        <li><b>CAD A-A score</b>: This score calculates the contact area difference between the designated central
          residue and all surrounding atoms. This calculation method provides a comprehensive perspective, showcasing
          the interactions of the central residue and its environmental changes.
        </li>
        <li><b>CAD A-S score</b>: This score, on the other hand, calculates the contact area difference between the
          central residue and the side chains of nearby residues, focusing on critical side chain interactions. This
          calculation method highlights the importance of side chains for protein function, especially near active
          sites.
        </li>
      </ol>
      <p>Due to the differences in these calculations, the A-A score provides a more holistic interaction assessment,
        while the A-S score emphasizes significant interactions among side chains. By understanding this, you can delve
        deeper into the characteristics of both scores and apply this information more effectively in your research.</p>
      <h2>Q : How to interpret the table shown in the sequence optimization function page?</h2>
      <p><b>A :</b> In the Sequence Optimization function page, the information displayed in the table can be understood
        as follows:</p>
      <ol>
        <li><b>First Column</b>: This column shows the ID of the mutant protein, serving as a unique identifier to
          distinguish between different mutants.
        </li>
        <li><b>Second Column (Mutant)</b>: This column indicates the mutation information in the format “Original Amino
          Acid→Position→Mutated Amino Acid” (for example, “A23G”), allowing you to quickly identify specific mutations.
        </li>
        <li><b>Third Column (Evolution Score)</b>: This score represents the level of optimization of the mutant
          sequence. If you have selected optimization for localization efficiency, a higher score indicates that the
          protein has a greater localization efficiency after directed evolution; if you have chosen fitness
          optimization, a higher score means that the protein is more stable in the corresponding organelle following
          directed evolution.
        </li>
      </ol>
      <h2>Q : What experimental organisms does Atlas.Y support?</h2>
      <p><b>A :</b> Currently, Atlas.Y primarily focuses on the subcellular localization systems of yeast, providing
        users with robust tools for the design and validation of protein targeting and localization within this model
        organism. However, we are actively working to expand our support to include additional species. Future
        iterations of Atlas.Y will consider the integration of mammalian cells, plant cells, and other experimental
        organisms to cater to a broader scientific community.</p>
      <p>Our goal is to establish Atlas.Y as a versatile and powerful tool for protein localization research, regardless
        of the experimental systems employed by users. By accommodating a diverse range of organisms, we aim to enhance
        the utility and applicability of Atlas.Y in various biological research contexts, ultimately facilitating
        advances in the understanding of protein dynamics across different cellular environments.</p>
      <h2>Q : What is the potential application of Atlas.Y in industrial and research settings?</h2>
      <p><b>A :</b> Atlas.Y possesses significant application value not only in fundamental research, aiding scientists
        in elucidating the mechanisms of protein subcellular localization, but also in various fields such as
        biomanufacturing, drug delivery, and disease treatment. For instance, researchers can leverage Atlas.Y to target
        proteins with specific functions to cellular organelles such as mitochondria or the endoplasmic reticulum,
        thereby optimizing metabolic or synthetic pathways within cells.</p>
      <p>Through precise control of protein localization, Atlas.Y facilitates the creation of "cell factories" that can
        conduct multiple distinct biological processes simultaneously across different subcellular regions. This
        capability substantially enhances the efficiency of biomanufacturing processes, paving the way for innovative
        approaches to produce valuable bioproducts and therapeutics. As such, Atlas.Y stands as a transformative tool in
        both basic scientific research and applied industrial biotechnology, promising to advance our understanding of
        cellular dynamics and improve the effectiveness of biotechnological applications.</p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
}

.container {
  display: flex;
  width: 1100px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 30px;
}

h1 {
  color: #5182F8;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 0;
}

h2 {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  margin-top: 40px;
  margin-bottom: 15px;
}

p {
  color: #000000;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

ol {
  color: #000000;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
