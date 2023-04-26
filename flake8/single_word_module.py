import ast
import os
from flake8_plugin_utils import Error, Visitor, Plugin


class ModuleNameError(Error):
    code = "SWL100"
    message = "module name should be a single-word lowercase"


class ModuleNameVisitor(Visitor):
    def _check_module_name(self, node):
        if not os.path.isabs(node.filename):
            return
        module_name = os.path.basename(node.filename).split('.')[0]
        if not module_name.islower() or '_' in module_name:
            self.error(node, ModuleNameError)

    def visit_Module(self, node):
        self._check_module_name(node)
        self.generic_visit(node)


class SingleWordLowercasePlugin(Plugin):
    name = 'flake8-single-word-lowercase'
    version = '0.1.0'
    visitor_class = ModuleNameVisitor


def get_plugin():
    return SingleWordLowercasePlugin
