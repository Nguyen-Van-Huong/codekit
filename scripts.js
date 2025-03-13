document.addEventListener("DOMContentLoaded", () => {
    const workspace = Blockly.inject("blocklyDiv", {
        toolbox: `<xml>
            <category name="Logic" colour="210">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
                <block type="logic_null"></block>
                <block type="logic_ternary"></block>
            </category>
            <category name="Loops" colour="120">
                <block type="controls_repeat_ext"></block>
                <block type="controls_whileUntil"></block>
                <block type="controls_for"></block>
                <block type="controls_forEach"></block>
                <block type="controls_flow_statements"></block>
            </category>
            <category name="Math" colour="230">
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
                <block type="math_trig"></block>
                <block type="math_constant"></block>
                <block type="math_number_property"></block>
                <block type="math_round"></block>
                <block type="math_on_list"></block>
                <block type="math_modulo"></block>
                <block type="math_random_int"></block>
                <block type="math_random_float"></block>
            </category>
            <category name="Text" colour="160">
                <block type="text"></block>
                <block type="text_join"></block>
                <block type="text_append"></block>
                <block type="text_length"></block>
                <block type="text_isEmpty"></block>
                <block type="text_indexOf"></block>
                <block type="text_charAt"></block>
                <block type="text_getSubstring"></block>
                <block type="text_changeCase"></block>
                <block type="text_trim"></block>
                <block type="text_print"></block>
            </category>
            <category name="Lists" colour="260">
                <block type="lists_create_empty"></block>
                <block type="lists_create_with"></block>
                <block type="lists_repeat"></block>
                <block type="lists_length"></block>
                <block type="lists_isEmpty"></block>
                <block type="lists_indexOf"></block>
                <block type="lists_getIndex"></block>
                <block type="lists_setIndex"></block>
                <block type="lists_split"></block>
            </category>
            <category name="Variables" colour="330" custom="VARIABLE"></category>
            <category name="Functions" colour="290" custom="PROCEDURE"></category>
        </xml>`,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.2,
            maxScale: 1.5,
            minScale: 0.5,
            scaleSpeed: 1.2,
        },
    });
  
    const updateCode = () => {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      document.getElementById("generatedCode").value = code;
    };
  
    workspace.addChangeListener(updateCode);
  });
  
